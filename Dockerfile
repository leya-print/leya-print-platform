FROM mcr.microsoft.com/playwright:focal-arm64

RUN apt update && \
    apt install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring && \
    curl https://nginx.org/keys/nginx_signing.key \
      | gpg --dearmor \
      | tee /usr/share/keyrings/nginx-archive-keyring.gpg > /dev/null && \
    echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
      | tee /etc/apt/sources.list.d/nginx.list > /dev/null && \
    echo "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
      | tee /etc/apt/preferences.d/99nginx > /dev/null && \
    echo "\n\n------ test ----" && cat /etc/apt/preferences.d/99nginx && echo "---- end ---\n\n" && \
    apt update && \
    apt install -y nginx

COPY server/container/nginx.default.conf /etc/nginx/conf.d/default.conf

ADD ./server/rest/dist /leya-print/server/rest
ADD ./web/designer/www /leya-print/web/designer/www

EXPOSE 8080

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
