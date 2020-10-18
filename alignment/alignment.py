import json
import os
import sys
import uuid

from Bio import SeqIO
from Bio.Blast import NCBIXML
from Bio.Blast.Applications import NcbiblastnCommandline
from Bio.Seq import Seq
from Bio.SeqRecord import SeqRecord

path = '/Users/manish/Documents/ginkgo_bioworks_project/alignment/'
blastn_path = '/usr/local/ncbi/blast/bin/blastn'
db_name = path + "db/out_prot_db"

_id = str(uuid.uuid4().hex) 
out_name = "tmp." + _id + ".xml"
query_name =  path + "OTU_reference_small"+ _id  +".fasta"

alignment_sequence = Seq(sys.argv[1])

record = SeqRecord(alignment_sequence,id="",description="")
SeqIO.write(record, query_name, "fasta")

blastn_cline = NcbiblastnCommandline(cmd=blastn_path, query=query_name, 
                                     db= db_name, evalue=10,
                                     outfmt=5, task='blastn', out=path + "xml/" + out_name)

stdout, stderr = blastn_cline()
result_handle = open(path+"xml/" + out_name)
blast_record = NCBIXML.read(result_handle)
send_message_back = []
for alignment in blast_record.alignments:
    for hsp in alignment.hsps:
        single_ret = {
                'sequence': alignment.title,
                'length' : alignment.length,
                'evalue' : hsp.expect,
                'identities' : hsp.identities,
                'hspquery' : hsp.query,
                'hspmatch' : hsp.match,
                'hspsbjct' : hsp.sbjct,
                'hspstart' : hsp.sbjct_start,
                'hspend' : hsp.sbjct_end
                }
        send_message_back.append(single_ret)


os.remove(path+"xml/" + out_name)
os.remove(query_name)

print(json.dumps(send_message_back))
sys.stdout.flush()
