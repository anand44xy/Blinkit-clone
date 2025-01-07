const forgotPasswordTemplate = ({ name, otp}) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Forgot Password</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background: #fff; border: 1px solid #ddd; border-radius: 5px; padding: 20px;">
            <h3 style="color: #333;">Reset Your Password</h3>

            <p>Hi <strong>${name}</strong>,</p>
            <p>Your OTP for resetting your password is:</p>

            <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 15px 0; color: #4caf50;">${otp}</div>
            <p>This OTP is valid for <strong>1 hour</strong>.</p>
            
            <p>If you didn’t request this, ignore this email.</p>
            <p>Thanks, <br>Blinkit Team</p>
            <footer style="text-align: center; font-size: 12px; color: #777; margin-top: 15px;">© 2024 Blinkit</footer>
        </div>
    </body>
    </html>
    `
}

export default forgotPasswordTemplate