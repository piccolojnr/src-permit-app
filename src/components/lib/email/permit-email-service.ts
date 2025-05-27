import { toast } from "@/components/hooks/use-toast"
import { generatePermitEmailTemplate } from "./template-views/permit-email-template"
import { generateReceiptEmailTemplate } from "./template-views/receipt-email-template"

interface PermitResponse {
  data: {
    student: {
      email: string
      name: string
      studentId: string
      course: string
      level: string
    }
    id: string
    amountPaid: number
    expiryDate: Date
  }
  qrCode: string
  permitCode: string
}

export async function sendPermitEmails(response: PermitResponse) {
  const { data, qrCode, permitCode } = response
  const { student, ...permit } = data


  try {
    // Send permit details email
    await sendPermitDetailsEmail(student, permit, qrCode, permitCode)

    // Send receipt email
    await sendReceiptEmail(student, permit, qrCode, permitCode)

    toast({
      title: "Email Sent",
      description: "Permit details and receipt have been sent to the student's email.",
    })
  } catch (error) {
    console.error("Error sending emails:", error)
    toast({
      title: "Email Error",
      description: "Failed to send emails. Please check your email settings.",
      variant: "destructive",
    })
  }
}

async function sendPermitDetailsEmail(
  student: PermitResponse["data"]["student"],
  permit: Omit<PermitResponse["data"], "student">,
  qrCode: string,
  permitCode: string,
) {
  const { html, text } = generatePermitEmailTemplate({
    student,
    permit,
    qrCode,
    permitCode,
  })
  const base64Image = qrCode.split(',')[1]; // removes "data:image/png;base64,"

  return window.api.email.send({
    to: student.email,
    subject: "Knutsford University SRC - Your Permit Details",
    text,
    html,
    attachments: [
      {
        filename: 'qr-code.png',
        content: base64Image,
        encoding: 'base64',
        cid: 'qr-code.png' // this ID will be referenced in your HTML
      }
    ]
  })
}

async function sendReceiptEmail(
  student: PermitResponse["data"]["student"],
  permit: Omit<PermitResponse["data"], "student">,
  qrCode: string,
  permitCode: string,
) {
  const { html, text } = generateReceiptEmailTemplate({
    student,
    permit,
    permitCode,
  })
  const base64Image = qrCode.split(',')[1]; // removes "data:image/png;base64,"
  return window.api.email.send({
    to: student.email,
    subject: "Knutsford University SRC - Payment Receipt",
    text,
    html,
    attachments: [
      {
        filename: 'qr-code.png',
        content: base64Image,
        encoding: 'base64',
        cid: 'qr-code.png' // this ID will be referenced in your HTML
      }
    ]
  })
}
