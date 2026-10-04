import pyodbc

server = r'.\SQLEXPRESS'
database = 'AgriCareLK_DB'

try:
    conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'
    print("Database එකට සම්බන්ධ වෙමින් පවතී...")
    
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    print("✅ Database එකට සාර්ථකව සම්බන්ධ විය!\n")

    query = """
    SELECT d.CommonName_EN, d.CommonName_SI, d.Symptoms_SI, t.TreatmentType, t.Instruction_SI
    FROM Diseases d
    LEFT JOIN Treatments t ON d.DiseaseID = t.DiseaseID
    """

    cursor.execute(query)
    rows = cursor.fetchall()

    if len(rows) == 0:
        print("⚠️ Database එකේ දත්ත කිසිවක් නොමැත. කරුණාකර SSMS හරහා දත්ත ඇතුළත් කරන්න.")
    else:
        print("--- Database එකෙන් ලබාගත් දත්ත ---\n")
        for row in rows:
            print(f"🌿 රෝගය (EN): {row.CommonName_EN}")
            print(f"🌿 රෝගය (SI): {row.CommonName_SI}")
            print(f"🔍 රෝග ලක්ෂණ: {row.Symptoms_SI}")
            print(f"💊 ප්‍රතිකාර වර්ගය: {row.TreatmentType}")
            print(f"📝 උපදෙස්: {row.Instruction_SI}")
            print("-" * 40)

    conn.close()

except Exception as e:
    print("❌ Error එකක් ආවා:", e)