from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import os

print("Starting Palo Alto EOL Scraper...")

# Setup Chrome options
options = Options()
options.add_argument("--start-maximized")

# Launch browser
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

url = "https://www.paloaltonetworks.com/services/support/end-of-life-announcements/hardware-end-of-life-dates"
driver.get(url)

# Wait until table loads
WebDriverWait(driver, 20).until(
    EC.presence_of_element_located((By.XPATH, "//table"))
)

print("Page loaded successfully.")

rows = driver.find_elements(By.XPATH, "//table//tbody/tr")

data = []

for row in rows:
    cols = row.find_elements(By.TAG_NAME, "td")

    if len(cols) >= 3:
        product_name = cols[0].text.strip()
        eol_date = cols[1].text.strip()

        resource_link = ""
        try:
            resource_link = cols[2].find_element(By.TAG_NAME, "a").get_attribute("href")
        except:
            pass

        recommended = ""
        if len(cols) >= 4:
            recommended = cols[3].text.strip()

        data.append([
            "Palo Alto",
            product_name,
            eol_date,
            resource_link,
            recommended
        ])

driver.quit()

# Create DataFrame
df = pd.DataFrame(data, columns=[
    "vendor",
    "productName",
    "EOL Date",
    "resource",
    "Recommended replacement"
])

# Ensure output folder exists
os.makedirs("output", exist_ok=True)

# Save as CSV
csv_path = "output/paloalto_hardware_eol.csv"
df.to_csv(csv_path, index=False, encoding="utf-8")

print(" CSV file created successfully!")
print(f"Location: {csv_path}")
