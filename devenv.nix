{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
  ];
  languages.javascript = { 
    enable = true;
    pnpm.enable = true;
  };
}
