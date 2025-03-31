export const translateStatus = (status: string): string => {
    switch (status) {
        case 'AVAILABLE':
            return 'Disponível';
        case 'RENTED':
            return 'Alugado';
        default:
            return status;
    }
};