from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import datetime
import csv
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.paloaltonetworks.com/services/support/end-of-life-announcements/end-of-life-summary")

wait = WebDriverWait(driver, 20)

# Scroll slowly to load all dynamic content
for i in range(1, 10):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

# Wait until tables appear
wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, "table")))

tables = driver.find_elements(By.TAG_NAME, "table")

output = []

for table in tables:
    try:
        software_name = table.find_element(By.XPATH, "preceding::h3[1]").text.strip()
    except:
        software_name = "Unknown"

    rows = table.find_elements(By.TAG_NAME, "tr")

    for row in rows[1:]:
        cols = row.find_elements(By.TAG_NAME, "td")
        if len(cols) >= 3:
            version = cols[0].text.strip()
            release_date = cols[1].text.strip()
            eol_date = cols[2].text.strip()

            def format_date(text):
                try:
                    dt = datetime.datetime.strptime(text, "%B %d, %Y")
                    return dt.strftime("%Y-%m-%d")
                except:
                    return text

            output.append({
                "Software Name": software_name,
                "Version": version,
                "Release Date": format_date(release_date),
                "EOL Date": format_date(eol_date)
            })

driver.quit()

with open("palo_software_eol.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["Software Name","Version","Release Date","EOL Date"])
    writer.writeheader()
    writer.writerows(output)

print("Scraping complete! Total records:", len(output))