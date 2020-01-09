function jsonToCSV() {
    myData = []
    for (let i = 0; i < 30; i++) {
        
    }

    const fields = ["mac_addr", "feature", "team", "label"];
    const opts = { fields };

    try {
        const csv = parse(myData, opts);
        return csv;
    } catch (err) {
        console.error(err);
        return null;
    }
}
