import SimpleHTTPServer
import SocketServer
import BaseHTTPServer, SimpleHTTPServer
import ssl


httpd = BaseHTTPServer.HTTPServer(('localhost', 4443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, certfile='/Users/jtep/Code/own/audioviz/cert.pem', keyfile='/Users/jtep/Code/own/audioviz/key.pem',server_side=True)
httpd.serve_forever()
