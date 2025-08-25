export const formatBalanceParts = (amount: number) => {
    const [intPart, fracPart] = amount
        .toFixed(2)
        .split('.')
        .map((part, index) =>
            index === 0 ? Number(part).toLocaleString('de-DE') : part
        );

    const full = `${intPart},${fracPart}₽`;

    return { intPart, fracPart, full };
};
