# Todo-List-App

Este proyecto tiene como objetivo la creación de una aplicación web para gestionar una lista de **TODOS**.

### Dependencias

La solución cuenta con 2 proyectos una aplicación de **React** ubicada en la carpeta `front-end` y una api de **.NET 7** ubicada en la carpeta `back-end`. Adicionalmente debe contar instalado en su sistema el sistema gestor de base de datos **MySql**.

### Ejecutando el Proyecto

- Primero necesitara configurar el script de conexión a la base de datos ubicado en el archivo `back-end/appsettings.json`, para ello debe modificar el valor de `DefaultConnection` del campo `ConnectionStrings`.

- Instalar las dependencias necesarias:

```
make install
```

```
make restore
```

en caso de no tener instalado **make**:

```
yarn --cwd front-end install
```

```
dotnet restore
```

- Crear o Actualizar la base de datos. Para ello debe iniciar su servidor **MySql** primero:

```
make db
```

en caso de no tener instalado **make**:

```
dotnet ef database update --project back-end
```

- Correr la aplicación. Es posible que necesite configurar el url de conexión de la app web con la api, el mismo lo puede hallar en `front-end\.env`:

```
make back-run
```

```
make front-run
```

en caso de no tener instalado **make**:

```
dotnet run --project back-end

```

```
yarn --cwd front-end start
```
