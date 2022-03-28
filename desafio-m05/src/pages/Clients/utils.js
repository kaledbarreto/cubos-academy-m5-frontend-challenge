export function orderColumnAsc(a, b, by) {
    if (by === 'nomeCliente') {
        return a.nome.toUpperCase().localeCompare(b.nome.toUpperCase());
    }

    if (by === 'idCobrança') {
        return a.id - b.id;
    }
}

export function orderColumnDesc(a, b, by) {
    if (by === 'nomeCliente') {
        return b.nome.toUpperCase().localeCompare(a.nome.toUpperCase());
    }

    if (by === 'idCobrança') {
        return b.id - a.id;
    }
}