/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // output: "out",
  // distDir: "out",
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;
