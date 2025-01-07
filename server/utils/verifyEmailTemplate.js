const verifyEmailTemplate = (name, url) => `
    <p>Dear ${name},</p>
    <p>Thank you for registering with Blinkit.</p>
    <a href="${url}" style="color: white; background: blue; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 10px;">Verify Email</a>
`;

export default verifyEmailTemplate;
