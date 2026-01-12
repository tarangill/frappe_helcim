frappe.provide('erpnext.PointOfSale');

// frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
//   console.log(wrapper);
// };
// var myPos;

// frappe.pages['point-of-sale'].refresh = function(wrapper) {
// 		console.log("['point-of-sale'].refresh", wrapper)
//     myPos = wrapper.pos;
//     console.log("payment: ", myPos.payment)
// };


frappe.ui.form.on("POS Invoice", {
  onload(frm) {
    console.log("1", frm)
    if (!frm.doc.is_pos) return;
    reset_pos_payments(frm);
  },
  refresh(frm) {
    console.log("2", frm)
    if (!frm.doc.is_pos) return;
    reset_pos_payments(frm);
  }
});


function reset_pos_payments(frm) {
    // Wait for POS UI to load
    setTimeout(() => {
        // Clear all payment rows
        frm.doc.payments.forEach(row => {
            row.amount = 0;
        });

        // Reset paid amount
        frm.doc.paid_amount = 0;

        frm.refresh_field("payments");
        frm.refresh_field("paid_amount");

		    // const xx = new erpnext.PointOfSale.Controller(frm);
        console.log("xx", erpnext.PointOfSale)

        // if(myPos){
        //   console.log("will reload numbers")
        //   myPos.payment.render_payment_section();
        // }

        // // Disable Complete Order button
        // toggle_complete_order(false);

    }, 300);
}

// function toggle_complete_order(enable) {
//     const btn = document.querySelector(".pos-btn.primary");
//     if (!btn) return;

//     btn.disabled = !enable;
//     btn.classList.toggle("disabled", !enable);
// }