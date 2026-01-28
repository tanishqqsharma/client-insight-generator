function processData() {
    const fileInput = document.getElementById("csvFile");
    if (!fileInput.files.length) {
      alert("Please upload a CSV file");
      return;
    }
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const rows = e.target.result.split("\n").slice(1);
      const tableBody = document.querySelector("#resultTable tbody");
      tableBody.innerHTML = "";
  
      rows.forEach(row => {
        const cols = row.split(",");
        if (cols.length < 6) return;
  
        const name = cols[1];
        const revenue = parseFloat(cols[2]);
        const lastPurchase = parseInt(cols[3]);
        const complaints = parseInt(cols[4]);
  
        let value = revenue >= 100000 ? "High" : revenue >= 50000 ? "Medium" : "Low";
        let risk = (lastPurchase > 90 || complaints >= 2) ? "High" : "Low";
  
        let recommendation = "Maintain Relationship";
        if (value === "High" && risk === "High") recommendation = "Immediate Retention Action";
        else if (value === "High") recommendation = "Upsell Opportunity";
        else if (risk === "High") recommendation = "Review Client Exposure";
  
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${name}</td>
          <td>${value}</td>
          <td>${risk}</td>
          <td>${recommendation}</td>
        `;
        tableBody.appendChild(tr);
      });
    };
  
    reader.readAsText(file);
  }
  