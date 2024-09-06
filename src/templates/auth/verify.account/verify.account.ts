export const VERIFY_ACCOUNT = (username: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Cuenta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4CAF50;
            padding: 10px;
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>Verifica tu cuenta</h1>
        </div>
        <div class="content">
            <p>¡Hola, ${username}!</p>
            <p>Gracias por registrarte. Por favor, haz clic en el botón de abajo para verificar tu cuenta de correo electrónico:</p>
            <a href="${process.env.URL_CONFIRM_ACCOUNT}" class="button">Verificar Cuenta</a>
        </div>
        <div class="footer">
            <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
            <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
        </div>
    </div>

</body>
</html>
`;
