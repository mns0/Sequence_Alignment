from Bio.Blast.Applications import NcbiblastnCommandline
from Bio.Blast import NCBIXML
import uuid
import os

query_name =  "OTU_reference_small.fasta"
db_name = "out_prot_db"
out_name = "tmp." + str(uuid.uuid4().hex) + ".xml"

blastn_cline = NcbiblastnCommandline(query=query_name, 
                                     db=db_name, evalue=10,
                                     outfmt=5,
                                     task='blastn',
                                     out="xml/" + out_name)

stdout, stderr = blastn_cline()
result_handle = open("xml/" + out_name)
blast_record = NCBIXML.read(result_handle)
for alignment in blast_record.alignments:
    for hsp in alignment.hsps:
        print("****Alignment****")
        print("sequence:", alignment.title)
        print("length:", alignment.length)
        print("e value:", hsp.expect)
        print("identities:", hsp.identities)
        print(hsp.query[0:75] + "...")
        print(hsp.match[0:75] + "...")
        print(hsp.sbjct[0:75] + "...")


os.remove("xml/" + out_name)
