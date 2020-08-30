# Author: Thomas Roff

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/xenial64"

  # MongoDB Machine 
  config.vm.define "dbserver" do |dbserver|
    dbserver.vm.hostname = "dbserver"
    dbserver.vm.network "forwarded_port", guest: 27017, host: 27017, host_ip: "127.0.0.1", auto_correct: true
    dbserver.vm.network "private_network", ip: "192.168.2.12"
    webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"] # for lab machines
    dbserver.vm.provision "shell", inline: <<-SHELL
      df -m
      apt-get update
      sudo apt-get install gnupg
      wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
      echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
      sudo apt-get update
      sudo apt-get install -y mongodb-org
      sudo sed -i 's/'127.0.0.1'/'0.0.0.0'/g' /etc/mongod.conf
      sudo service mongod start &
      sleep 5s
      df -m
    SHELL
  end

  # NodeJS With Express Machine 
  config.vm.define "webserver" do |webserver|
    webserver.vm.hostname = "webserver"
    webserver.vm.network "forwarded_port", guest: 3000, host: 3001, host_ip: "127.0.0.1", auto_correct: true
    webserver.vm.network "private_network", ip: "192.168.2.11"
    webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"] # for lab machines
    webserver.vm.provision "shell", inline: <<-SHELL
      df -m
      curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
      sudo apt-get update
      sudo apt-get install -y nodejs
      sudo npm install forever -g
      cd /vagrant/vm-1
      npm install
      #forever start app.js &
      sleep 5s
      df -m
    SHELL
  end

  # Report Generation Machine
  config.vm.define :pdf do |pdf|
    pdf.vm.box = "ubuntu/xenial64"
    pdf.vm.network "private_network", ip: "192.168.55.13"
    webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"] # for lab machines
    pdf.vm.hostname = "pdf"
    pdf.vm.provision "shell", inline: <<-SHELL
      df -m
      curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
      sudo apt-get update
      sudo apt-get install -y nodejs
      cd /vagrant/vm-3
      sudo npm install
      sudo chmod +x pdf-cron.sh
      sudo cp /vagrant/vm-3/pdf-cron.sh /etc/cron.daily
      sudo ./pdf-cron.sh
      df -m
    SHELL
  end
end
