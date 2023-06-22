const checkPopupClosed = (popup) => {
    return new Promise((resolve) => {
      const checkClosedInterval = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosedInterval);
          resolve();
        }
      }, 500);
    });
  };
  
  const openPopup = () => {
    const createPopup = () => {
      const popup = window.open("about:blank", "_blank");
      if (!popup || popup.closed) {
        alert("Allow popups and redirects to hide this from showing up in your history.");
      } else {
        const doc = popup.document;
        const iframe = doc.createElement("iframe");
        const style = iframe.style;
        const link = doc.createElement("link");
  
        const name = localStorage.getItem("name") || "My Drive - Google Drive";
        const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
  
        doc.title = name;
        link.rel = "icon";
        link.href = icon;
  
        iframe.src = location.href;
        style.position = "fixed";
        style.top = style.bottom = style.left = style.right = 0;
        style.border = style.outline = "none";
        style.width = style.height = "100%";
  
        doc.head.appendChild(link);
        doc.body.appendChild(iframe);
  
        checkPopupClosed(popup).then(() => {
          createPopup();
        });
      }
    };
  
    createPopup();
  };
  
  <!DOCTYPE html>
  <html>
  <head>
  <script>
  window.open('about:blank', '_blank');
  </script>
  </head>
  <body>
  </body>
  </html>
  
  if (window !== top && !navigator.userAgent.includes("Firefox")) {
    openPopup();
  }
  