import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, token } = body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html2 = `
<!DOCTYPE html>
    <html>
<body style="background-color: #eee; padding: 48px 32px 48px 32px" >
    
    <div>
        <div style="padding: 32px 32px 48px 32px; font-size: 14px; ">
        <p style="font-size: 18px; color: #000 ">
            RDMC Portal
        </p>
            <h1 style="font-size: 24px; font-weight: 900;">
                Verification code
            </h1>
            <p style="margin: 32px 0px 0px 0px">
                Enter the following verification code when prompted:
            </p>
            <p style="font-size: 40px; margin: 16px 0px 0px 0px; font-weight: 900;">
                <b>${token}</b>
            </p>
            <p style="margin: 16px 0px 0px 0px">
                To protect your account, do not share this code.
            </p>
            <p style="margin: 64px 0px 0px 0px">
                <b>Didn't request this?</b>
            </p>
            <p style="margin: 4px 0px 0px 0px; color: #333;">
                This message was sent from <b>RDMC Digital team</b>. If you didn't make this request, you can safely ignore this email.
            </p>
        </div>
    </div>
</body>
</html>
    `

    // const htmlContent = `
    //   <!DOCTYPE html>
    //   <html>
    //     <head>
    //       <style>
    //         body {
    //     font-family: Arial, sans-serif;
    //     margin: 0;
    //     padding: 0;
    //     background-color: #f9f9f9;
    //     color: #333;
    //     line-height: 1.6;
    //   }
    //   .container {
    //     max-width: 600px;
    //     margin: 20px auto;
    //     background: #fff;
    //     padding: 20px;
    //     border-radius: 8px;
    //     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //   }
    //   .header {
    //     text-align: left;
    //     margin-bottom: 20px;
    //   }
    //   .header h3 {
    //     font-size: 18px;
    //     margin: 0;
    //     color: #333;
    //   }
    //   .content {
    //     text-align: left;
    //   }
    //   .content h1 {
    //     font-size: 24px;
    //     margin-bottom: 20px;
    //     color: #222;
    //   }
    //   .token {
    //     display: inline-block;
    //     margin: 20px 0;
    //     padding: 10px 20px;
    //     color: #0aa;
    //     letter-spacing: 15px;
    //     font-size: 38px;
    //     font-weight: 900;
    //     font-family: Arial Black;
    //     text-decoration: none;
        
    //   }
    //   .footer {
    //     font-size: 12px;
    //     color: #888;
    //     text-align: left;
    //     margin-top: 20px;
    //   }
    //       </style>
    //     </head>
    //     <body>
    //       <div class="container">
    //         <div class="header">
    //           <h3>RDMC Portal</h3>
    //         </div>
    //         <div class="content">
    //           <h1>Verification code</h1>
    //           <p>Enter the following verification code when prompted:</p>
    //           <h1 class="token">${token}</h1>
    //           <p>To protect your account, do not share this code.</p>
    //         </div>
    //         <div class="footer">
    //           <p>
    //             This magic link was requested from RDMC Digital team. 
    //             If you didn't make this request, you can safely ignore this email.
    //           </p>
    //         </div>
    //       </div>
    //     </body>
    //   </html>
    // `;



    await transporter.sendMail({
      from: '"RDMC Portal" <notifications@rdmc-portal.com>',
      to,
      subject: "Sign in to RDMC Portal",
      html: html2,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
