function calcolaMedia(gradesData) {
    if (!gradesData.grades || gradesData.grades.length === 0) {
        return -1;
    }
    const votiValidi = gradesData.grades
        .map((g) => g.decimalValue)
        .filter((v) => v !== null && !isNaN(v));
    if (votiValidi.length === 0) {
        return -1;
    }
    const somma = votiValidi.reduce((r, v) => r + v, 0);
    return somma / votiValidi.length;
}
export default calcolaMedia;
//# sourceMappingURL=media.js.map