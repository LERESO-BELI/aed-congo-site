<?php
/**
 * Script de traitement du formulaire de contact pour Infomaniak
 * AED Congo — Action pour l'Environnement et le Développement
 */

// Configuration
$to_email = "aedcongo2015@gmail.com";
$subject_prefix = "[Contact Site Web] ";

// Vérification de la méthode
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("HTTP/1.1 405 Method Not Allowed");
    exit("Méthode non autorisée");
}

// Récupération et nettoyage des données
$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$bot_field = $_POST['bot-field'] ?? '';

// Protection Anti-Spam (Honeypot)
if (!empty($bot_field)) {
    // C'est un bot, on fait semblant d'avoir réussi
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
    exit;
}

// Validation
if (!$name || !$email || !$message) {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(["error" => "Données invalides"]);
    exit;
}

// Construction de l'email
$subject = $subject_prefix . $name;
$body = "Vous avez reçu un nouveau message depuis le site aed-congo.org\n\n";
$body .= "Nom : $name\n";
$body .= "Email : $email\n\n";
$body .= "Message :\n$message\n";

$headers = [
    "From" => "no-reply@aed-congo.org",
    "Reply-To" => $email,
    "Content-Type" => "text/plain; charset=utf-8",
    "X-Mailer" => "PHP/" . phpversion()
];

// Envoi
if (mail($to_email, $subject, $body, $headers)) {
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
} else {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(["error" => "Erreur lors de l'envoi de l'email"]);
}
