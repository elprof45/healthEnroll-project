interface UserData {
    createdAt: Date;
}

export const structureChartData = (userData: UserData[]) => {
    const monthsCount: Record<string, number> = {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0
    }
    userData.forEach((dat) => {
        const month = dat.createdAt.toLocaleString("en", { month: "short" }).toLowerCase()
        if (monthsCount[month] !== undefined) {
            monthsCount[month]++;
        }
    })

    return monthsCount
}