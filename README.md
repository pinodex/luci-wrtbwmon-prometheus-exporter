# luci-wrtbwmon-prometheus-exporter

A Prometheus exporter for luci-wrtbwmon to graph bandwidth usage per client.

[luci-wrtbwmon](https://github.com/Kiougar/luci-wrtbwmon) is a Luci module that uses [wrtbwmon](https://github.com/pyrovski/wrtbwmon) to track bandwidth usage.

## Requirements

1. A router running OpenWRT with luci-wrtbwmon package installed.
2. Make sure **Persist Database** settings is checked in the Network > Usage > Configuration.

## Usage

### With Docker

1. Create an SSH key-pair that this application will use to interact with OpenWrt router using SSH.
2. Build the included Dockerfile.
3. Run the Docker image with the SSH private key mounted and the following environment variables.

   - SSH_HOST - IP Address/Hostname to the OpenWrt router.
   - SSH_USERNAME - Username to be used to login to the router. Usually "root".
   - SSH_IDENTITY - Path to the SSH private key file.

   Example:

   ```sh
   docker run -it \
     -v /path/to/private/key:/key \
     -e SSH_HOST=192.168.1.1 \
     -e SSH_USERNAME=root \
     -e SSH_IDENTITY=/key
   ```

### Without Docker

1. Create an SSH key-pair that this application will use to interact with OpenWrt router using SSH.
2. Install dependencies with `npm install`.
3. Set the following environment variables:

   - SSH_HOST - IP Address/Hostname to the OpenWrt router.
   - SSH_USERNAME - Username to be used to login to the router. Usually "root".
   - SSH_IDENTITY - Path to the SSH private key file.

   Windows:

   ```
   set SSH_HOST=192.168.1.1
   set SSH_USERNAME=root
   set SSH_IDENTITY=C:\Path\To\Private\Key
   ```

   Unix:

   ```sh
   export SSH_HOST=192.168.1.1
   export SSH_USERNAME=root
   export SSH_IDENTITY=/path/to/private/key
   ```

4. Run the application

   ```sh
   npm start
   ```

## Metrics

This exports the following metrics per MAC Address and IP Address

- Download Usage
- Upload Usage
- Total Usage

Metrics can be accessed at http://localhost:3000/metrics
