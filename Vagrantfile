Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  # NodeJS With Express Machine 
  config.vm.define "webserver" do |webserver|
    webserver.vm.hostname = "webserver"
    webserver.vm.network "forwarded_port", guest: 3000, host: 3001, host_ip: "127.0.0.1"
    webserver.vm.network "private_network", ip: "192.168.2.11"
    webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
    webserver.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y nodejs
      apt-get install -y npm
      cd /vagrant/vm-1
      npm install
      nodejs app.js
    SHELL
  end
end

