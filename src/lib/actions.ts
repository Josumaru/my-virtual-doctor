import { signIn } from "@/auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    await signIn('credentials', {
        email: formData,
        password: 'dasd'
    })
    return "Authenticated successfully.";
  
  }
  