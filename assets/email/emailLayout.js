const EmailLayout = (token) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Email Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<style>
    * {
        padding: 0;
        margin: 0;
        font-family: 'Manrope', sans-serif;
        color: white;
    }
    body {
        background-color: #424B54;
    }

    .verify {
        background-color: green;
        outline: none;
        border: none;
        width: 90%;
        padding: 0.5rem;
        max-width: 500px;
        border-radius: 5px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin: 1rem;
        cursor: pointer;
    }

    .delete {
        background-color: darkred;
        outline: none;
        border: none;
        width: 90%;
        padding: 0.5rem;
        max-width: 500px;
        border-radius: 5px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin: 1rem;
        cursor: pointer;
    }

    .header {
        color: aliceblue;
        margin: 1rem;
    }

    div {
        text-align: center;
    }

    .text {
        margin: 1rem;
    }

</style>
<body>
    <div>
        <h1 class="header">Welcome to our App!</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" style="fill: rgb(7,189,80);"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>
        <br>
        <div class="text">
            <p>Dear user, </p>
            <br>
            <p>We are delighted to have you on board as a valued member of our community.
                Thank you for choosing our app to be a part of your journey. We've designed
                this platform with you in mind, aiming to provide a seamless and enjoyable
                experience.
            </p>
            <br>
            <p>
                To get started, all you need to do is click on the verification link provided below.
                This link will ensure your account is verified, and you'll be ready to explore all
                the exciting features our app has to offer.
            </p>
            <a class="" href="http://localhost:2000/api/auth/verify/${token}"><button class="verify">
                Verify
            </button></a>
            <p>
                Please remember that your privacy and security are of utmost importance to us.
                If you ever decide to discontinue using our app, you can simply click on the link
                below to delete your account.
            </p>

            <a class="" href="http://localhost:2000/api/auth/delete/${token}"><button class="delete">
                Delete
            </button></a>
            <p>
                If you encounter any issues during the verification process or have any questions
                about our app, feel free to reach out to our dedicated support team at
                support@appexample.com. They are here to assist you at any time.
            </p>
            <br>
            <p>
                Once again, welcome to our community! We look forward to providing you with a wonderful experience on our app.
            </p>
            <br>
            <p>
                Best regards, <br>
                The [App Name] Team
            </p>

        </div>

    </div>

</body>
</html>`
    return html;
}

module.exports = EmailLayout