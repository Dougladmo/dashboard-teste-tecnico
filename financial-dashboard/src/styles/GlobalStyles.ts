import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
    border-color: ${theme.colors.gray[200]};
  }

  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.outfit};
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[900]};
  }

  /* ApexCharts overrides */
  .apexcharts-legend-text {
    color: ${theme.colors.gray[700]} !important;
  }
  .apexcharts-text {
    fill: ${theme.colors.gray[700]} !important;
  }
  .apexcharts-tooltip.apexcharts-theme-light {
    border-radius: 8px !important;
    border-color: ${theme.colors.gray[200]} !important;
    padding: 12px !important;
    box-shadow: ${theme.shadows.sm} !important;
  }
  .apexcharts-gridline {
    stroke: ${theme.colors.gray[100]} !important;
  }

  /* Scrollbar utilities */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    border-radius: 999px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[200]};
    border-radius: 999px;
  }

  /* Hide date input pickers */
  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

export default GlobalStyles;
