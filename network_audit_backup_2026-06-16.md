# Network Audit Backup 2026-06-16

## Baseline

- OS: Windows 10 Pro 10.0.19045 Build 19045 x64
- Hostname: DESKTOP-QRUTK2S
- Adapter: Realtek PCIe GBE Family Controller
- Driver version: 10.10.714.2016
- Driver date: 2016-07-14
- Interface: Ethernet
- Link speed: 1 Gbps
- IPv4: 192.168.100.14/24
- Default gateway: 192.168.100.1
- Persistent default route: 0.0.0.0/0 via 192.168.100.1
- DNS servers: 8.8.8.8, 8.8.4.4
- Current MTU IPv4: 1500
- Current MTU IPv6: 1500
- DHCP IPv4: Disabled
- Internet TCP profile: CUBIC, autotuning normal, ECN disabled

## Baseline Measurements

- Gateway ping: 0% loss, 0-70 ms, 3 ms average
- Ping 8.8.8.8: 0% loss, 28-121 ms, 35 ms average
- Ping 1.1.1.1: 0% loss, 33-120 ms, 37 ms average
- Traceroute to 8.8.8.8: 12 hops, first hop inconsistent, destination about 28-34 ms
- MTU test: 1472 payload failed with DF, 1465 failed, 1464 succeeded
- Effective path MTU: 1492
- Download sample: about 26.9 MB/s or about 215 Mbps

## Rollback Targets

- Restore IPv4 MTU to 1500
- Restore IPv6 MTU to 1500
- Keep DNS as 8.8.8.8 and 8.8.4.4 unless future testing proves otherwise
