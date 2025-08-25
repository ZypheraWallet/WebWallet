import React from 'react';
import {
    Card,
    CardContent,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, History } from "lucide-react";

const transactions = [
    { id: 1, type: "in", amount: "250 TON", date: "24.08.2025", from: "@alex" },
    { id: 2, type: "out", amount: "75 TON", date: "23.08.2025", to: "@maria" },
    { id: 3, type: "in", amount: "0.5 BTC", date: "22.08.2025", from: "@exchange" },
];

const HistoryCard = () => {
    return (
        <Card className="lg:w-1/2 rounded-2xl max-lg:bg-card/50 shadow-sm border border-border backdrop-blur">
            <CardHeader>
                <CardTitle className="text-lg font-medium">История операций</CardTitle>
                <CardAction>
                    <Button variant={'link'} size={'sm'}><History />История операций</Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
                <ul className="divide-y divide-border">
                    {transactions.map((tx) => (
                        <li
                            key={tx.id}
                            className="flex items-center justify-between py-3"
                        >
                            <div className="flex items-center gap-3">
                                {tx.type === "in" ? (
                                    <ArrowDownLeft className="text-green-500 w-5 h-5" />
                                ) : (
                                    <ArrowUpRight className="text-red-500 w-5 h-5" />
                                )}
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">
                                        {tx.amount}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {tx.date}{" "}
                                        {tx.type === "in"
                                            ? `от ${tx.from}`
                                            : `к ${tx.to}`}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default HistoryCard;
