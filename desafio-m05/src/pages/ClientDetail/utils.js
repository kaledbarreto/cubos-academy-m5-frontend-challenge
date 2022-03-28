export function orderColumnAsc(a, b, by) {
    if (by === 'dataVencimento') {
        return new Date(a.vencimento) - new Date(b.vencimento);
    }

    if (by === 'cobrancaId') {
        return a.id - b.id;
    }
}

export function orderColumnDesc(a, b, by) {
    if (by === 'dataVencimento') {
        return new Date(b.vencimento) - new Date(a.vencimento);
    }

    if (by === 'cobrancaId') {
        return b.id - a.id;
    }
}