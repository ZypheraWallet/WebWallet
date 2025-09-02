import Cookies from 'js-cookie';
import { refreshSession } from '@/utils/session';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export class ApiClient {
    private refreshPromise: Promise<string> | null = null;

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${SERVER_URL}${endpoint}`;
        const token = Cookies.get('zyphera_access');

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });

        if (response.status === 401) {
            const newToken = await this.handleRefresh();
            return this.retryRequest<T>(endpoint, options, newToken);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    private async handleRefresh(): Promise<string> {
        if (!this.refreshPromise) {
            this.refreshPromise = this.refreshToken();
        }

        try {
            return await this.refreshPromise;
        } finally {
            this.refreshPromise = null;
        }
    }

    private async refreshToken(): Promise<string> {
        const result = await refreshSession();

        if (!result?.accessToken) {
            throw new Error('No access token returned from refreshSession');
        }

        Cookies.set('zyphera_access', result.accessToken, { expires: 1 });
        if (result.refreshToken) {
            Cookies.set('zyphera_refresh', result.refreshToken, { expires: 7 });
        }

        return result.accessToken;
    }

    private async retryRequest<T>(
        endpoint: string,
        options: RequestInit,
        token: string
    ): Promise<T> {
        const url = `${SERVER_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint);
    }

    post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();