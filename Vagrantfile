# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/vivid64"
  config.vm.network "forwarded_port", guest: 6001, host: 6001

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate//vagrant","1"]
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs build-essential
    cd /vagrant
    sudo npm install -g bower gulp
    sudo npm install
    bower install

    # sudo apt-get install -y apache2
  SHELL
end
