import { sendEmail } from "../../../../shared/utils/communication-functions";

 class AuthService {
  strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/;
  constructor() {}
  async getAdminCommunities(adminId: string) {}

  async sendPasswordResetEmail(
    emails: string[],
    username: string,
    resetLink: string
  ) {
    const subject = `Password Reset Confirmation`;
    const body = `
        <p>Hello ${username},</p>
        <p>You recently requested to reset your password for your account in Andorra360 dashboard. To complete the process, please click the link below:</p>
        <p style="text-align: center;">
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Password Reset Confirmation Link</a>
        </p>
        <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Best regards,<br/>Andorra360 Team</p>
        `;
    sendEmail(emails, subject, body);
  }

  async sendNewPasswordEmail(
    emails: string[],
    username: string,
    newPassword: string
  ) {
    const subject = `Your New Password`;
    const body = `
        <p>Hello ${username},</p>
        <p>Your password has been successfully reset. Here is your new password:</p>
        <p style="font-weight: bold;">New Password: ${newPassword}</p>
        <p>Please use this password to log in to your account. We recommend changing your password after logging in for security reasons.</p>
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        <p>Best regards,<br/>Andorra360 Team</p>
        `;
    sendEmail(emails, subject, body);
  }

  
}
export default new AuthService()
