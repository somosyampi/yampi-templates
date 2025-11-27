#!/bin/bash

# Script para atualizar o template de produção a partir do template de uma loja específica.
# Uso: ./sync-production-template.sh <ALIAS_DA_LOJA>
# O intuito desse script é, por exemplo, editar uma loja no seu ambiente local, testar as mudanças e criar uma branch de fix ou feature para atualizar o template de produção.

USE_MESSAGE="Uso: ./sync-production-template.sh <ALIAS_DA_LOJA>."

if [ "$#" -ne 1 ]; then
  echo "$USE_MESSAGE" >&2
  
  exit 1 
fi

STORE_ALIAS=$1

aws s3 sync s3://codigo-aberto-sandbox-assets.yampi.io/$STORE_ALIAS/assets/rocket-preview/ ./rocket-assets/
aws s3 sync s3://codigo-aberto-sandbox-assets.yampi.io/$STORE_ALIAS/templates/rocket-preview/ ./rocket/

# Substitui o bucket de sandbox pelo bucket de produção
grep -rl --exclude="*.yml" --exclude="*.sh" 'codigo-aberto-sandbox-assets' . | xargs -r sed -i 's/codigo-aberto-sandbox-assets/openstore-production-assets/g'

# Substitui o caminho do template sandbox pelo caminho do template main
grep -rl --exclude="*.yml" --exclude="*.sh" 'yampi-templates-sandbox' . | xargs -r sed -i 's/yampi-templates-sandbox/yampi-templates-main/g'

# Substitui o caminho dos assets do template sandbox pelo caminho dos assets no template de produção
grep -rl --exclude="*.yml" --exclude="*.sh" 'rocket/assets/rocket-preview/' . | xargs -r sed -i 's/rocket\/assets\/rocket-preview/yampi-templates-main\/rocket-assets/g'

# Substitui a URL das imagens de sandbox pela URL das imagens de produção
grep -rl --exclude="*.yml" --exclude="*.sh" 'images-dev.yampi' . | xargs -r sed -i 's/images-dev.yampi/images.yampi/g'