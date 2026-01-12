# import frappe
# from frappe_helcim.helcim.api import helcim_get

# #/api/method/frappe_helcim.webhook.helcim

# @frappe.whitelist(allow_guest=True)
# def helcim():
#     data = frappe.request.get_json()
#     transaction_id = data.get("transactionId")

#     txn = helcim_get(f"/card-transactions/{transaction_id}")

#     doc = frappe.get_doc("Helcim Transaction", {
#         "helcim_reference": transaction_id
#     })

#     if txn["status"] == "APPROVED":
#         doc.status = "Approved"
#         notify_pos(doc.invoice, "approved")
#     else:
#         doc.status = "Declined"
#         notify_pos(doc.invoice, "declined")

#     doc.save()

# def notify_pos(invoice, status):
#     frappe.publish_realtime(
#         event=f"helcim_payment_{invoice}",
#         message={"status": status}
#     )
