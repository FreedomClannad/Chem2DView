#!/bin/bash
docker run --restart=always -d -p 13000:13000 --name=indigo_service_v1_32_0 epmlsop/indigo-service:1.32.0 /bin/sh -c "gunicorn --bind 0.0.0.0:13000 --workers=5 app:app"