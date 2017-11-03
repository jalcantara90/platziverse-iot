# platziverse-mqtt

## `agent/connected`

``` js
{
  agent: {
    uuid, // auto generar
    username, // definir por configuracion
    name, // definir por configuracion
    hostname, // lo vamos a obtener del sistema operativo
    pid // obtener del proceso
  }
}
```

## `agent/disconnected`

``` js
{
  agent: {
    uuid
  }
}
```

## `agent/message`

``` js
{
  agent,
  metric: [
    {
      type,
      value
    }
  ],
  timestamp // generar cuando creamos el mensaje
}
```