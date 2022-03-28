export function orderColumnAsc(a, b, by) {
    if (by === 'nomeCliente') {
        return a.nomecliente.toUpperCase().localeCompare(b.nomecliente.toUpperCase());
    }

    if (by === 'idCobrança') {
        return a.id - b.id;
    }
}

export function orderColumnDesc(a, b, by) {
    if (by === 'nomeCliente') {
        return b.nomecliente.toUpperCase().localeCompare(a.nomecliente.toUpperCase());
    }

    if (by === 'idCobrança') {
        return b.id - a.id;
    }
}