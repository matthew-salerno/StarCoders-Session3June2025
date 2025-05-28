{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = [
    pkgs.git
  ];
  languages.javascript = { 
    enable = true;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  devcontainer.enable = false;
}
