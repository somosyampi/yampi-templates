#!/bin/bash

# Script para corrigir os paths no template de sandbox.
# O intuito desse script é, por exemplo, puxar as atualizações de um branch específico para o branch sandbox e ajustar o caminho dos arquivos para ser possível testar as alterações.

# Substitui o bucket de sandbox pelo bucket de produção
grep -rl --exclude="*.yml" --exclude="*.sh" 'openstore-production-assets' . | xargs -r sed -i 's/openstore-production-assets/codigo-aberto-sandbox-assets/g'

# Substitui o caminho do template sandbox pelo caminho do template main
grep -rl --exclude="*.yml" --exclude="*.sh" 'yampi-templates-main' . | xargs -r sed -i 's/yampi-templates-main/yampi-templates-sandbox/g'
