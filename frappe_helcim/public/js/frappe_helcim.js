frappe.provide('erpnext.PointOfSale');

frappe.pages['point-of-sale'].refresh = function(wrapper) {
    console.log("1")
    if (!window.cur_pos) return;
    console.log("2")

    // 1. Load device selection when POS opens
    loadHelcimDevices();

    // 2. Hook payment method
    const originalCheckout = cur_pos.checkout;
    cur_pos.checkout = async function () {
        const mode = this.frm.doc.mode_of_payment;

        if (mode === "Credit Card (Helcim)") {
            await startHelcimPayment();
        } else {
            originalCheckout.apply(this);
        }
    };
}

async function loadHelcimDevices() {
  console.log("inside loadHelcimDevices")
    if (localStorage.getItem("helcim_device_id")) return;

    const res = await frappe.call("frappe_helcim.pos.get_devices");
    const devices = res.message.devices || [];

    const d = await frappe.prompt([
        {
            fieldname: "device",
            label: "Select Helcim Terminal",
            fieldtype: "Select",
            options: devices.map(d => `${d.id}|${d.name}`).join("\n"),
            reqd: 1
        }
    ], "Helcim Terminal");

    localStorage.setItem("helcim_device_id", d.device.split("|")[0]);
}

async function startHelcimPayment() {
    const deviceId = localStorage.getItem("helcim_device_id");
    const invoice = cur_pos.frm.doc.name;
    const amount = cur_pos.frm.doc.grand_total;

    frappe.show_alert("Waiting for card payment...");

    await frappe.call({
        method: "frappe_helcim.pos.start_purchase",
        args: { invoice, amount, device_id: deviceId }
    });

    frappe.realtime.on(`helcim_payment_${invoice}`, (data) => {
        if (data.status === "approved") {
            frappe.show_alert("Payment Approved");
            cur_pos.submit_invoice();
        } else {
            frappe.msgprint("Payment Declined");
        }
    });
}
