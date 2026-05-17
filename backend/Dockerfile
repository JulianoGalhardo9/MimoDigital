FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia todos os .csproj mantendo a estrutura de pastas
COPY MimoDigital.API/MimoDigital.API.csproj MimoDigital.API/
COPY MimoDigital.Application/MimoDigital.Application.csproj MimoDigital.Application/
COPY MimoDigital.Infrastructure/MimoDigital.Infrastructure.csproj MimoDigital.Infrastructure/
COPY MimoDigital.Domain/MimoDigital.Domain.csproj MimoDigital.Domain/

RUN dotnet restore "MimoDigital.API/MimoDigital.API.csproj"

# Copia todo o código fonte
COPY . .

RUN dotnet build "MimoDigital.API/MimoDigital.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MimoDigital.API/MimoDigital.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MimoDigital.API.dll"]