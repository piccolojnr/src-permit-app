import { sendPermitEmails } from "../lib/email/permit-email-service"
import { CreatePermitData } from "../lib/schemas/permit-schema"
import { toast } from "./use-toast"

export function usePermitCreation() {
  const createPermit = async (data: CreatePermitData) => {
    try {
      // API call to create permit
      const response = await window.api.permit.create(data)

      if (!response.success) {
        throw new Error("Failed to create permit")
      }

      toast({
        title: "Success",
        description: "Permit created successfully",
      })

      // Send emails if student email exists
      if (response.data?.student.email && response.data) {
        const permitResponse = {
          ...response,
          data: {
            ...response.data,
            id: response.data.id.toString(),
          },
          qrCode: response.qrCode || "",
          permitCode: response.permitCode || "",
        }
        await sendPermitEmails(permitResponse)
      }

      return response
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create permit. Please try again."
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw error
    }
  }

  return { createPermit }
}
