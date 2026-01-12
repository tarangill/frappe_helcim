# import frappe
# from frappe_helcim.helcim.api import helcim_get, helcim_post

# @frappe.whitelist()
# def get_devices():
#     return helcim_get("/devices")

# @frappe.whitelist()
# def start_purchase(invoice, amount, device_id):
#     payload = {
#         "deviceId": device_id,
#         "amount": float(amount),
#         "currency": "USD",
#         "reference": invoice
#     }

#     res = helcim_post("/card-terminal/start-purchase", payload)

#     frappe.get_doc({
#         "doctype": "Helcim Transaction",
#         "invoice": invoice,
#         "status": "Pending",
#         "amount": amount,
#         "device_id": device_id,
#         "helcim_reference": res.get("transactionId")
#     }).insert(ignore_permissions=True)

#     return res
