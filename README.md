# mock_api
A Simple mock web server for develop applications

## Usage
### 執行 Container
``` bash
./mock_server.sh start
```
### 停止 Container
``` bash
./mock_server.sh stop
```


### 
 執行container後，可以在終端機看到internalIP，預設port為3000
 在src/response_data放入需要的json檔案，檔名即為路徑
 e.g.
 ``` bash
  http://internalIP:3000/mock-token
 ```
 
