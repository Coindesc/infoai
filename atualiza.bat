@echo off
chcp 65001 >nul
title Atualizador Automático • InfoAI / VendeRápido

echo ========================================================
echo   📰 ATUALIZADOR AUTOMÁTICO • INFOAI / VENDERÁPIDO
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Verificando e enviando alterações para o GitHub...
git add .
git diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    echo       Salvando alterações locais...
    git commit -m "chore: auto-update via atualiza.bat"
)
git push origin dev
git checkout main
git merge dev
git push origin main
git checkout dev
echo       GitHub sincronizado com sucesso!
echo.

echo [2/3] Conectando à VPS Hostinger (72.61.35.28)...
echo       (Se pedir senha, digite a sua senha de root e pressione Enter)
echo.

ssh -t root@72.61.35.28 "cd /var/www/venderapido && git pull && docker compose -f deploy/docker-compose.yml up -d --build infoai-web"

echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo   ✅ VPS ATUALIZADA COM SUCESSO!
    echo   🌐 Acesse ao vivo: https://venderapido.com.br
) else (
    echo   ⚠️ Finalizado. Verifique se a conexão SSH foi concluída.
)
echo ========================================================
echo.
pause
