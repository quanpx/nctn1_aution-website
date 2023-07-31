export const modifyCurrency = (amount) => {
    return amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
}