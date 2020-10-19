# Sequence Alignment Application

Link to the running application:
[https://dry-headland-10538.herokuapp.com/
](https://dry-headland-10538.herokuapp.com/)


### Sign-up, login, and run an alignment!
#### Note: Do not use your real email address/passwords to sign-up

 
Here's a sample sequence string: 

```
ACGGTTGGGGTGGAGACGACGACTTGGCCTCTTGGCCATCCATCCCACTGATGGTGTCATCCGTTCATAC
```
The alignment with the largest e-values is returned in an alignment table. Alignments are structured and performed via the Biopython library and an blastn executable. Alignments are performed against a local blast database found in the /alignments folder. Results are stored in a cloud Mongo database instance. The front-end uses React components, Redux, and Tailwind CSS while the backend is an express framework. Passwords are salted and hashed before storage so the app is marginally secure, however, for testing use false credentials.


### Instructions to Running Application Locally 

```console
foo@bar:~$ git clone https://github.com/mns0/Sequence_Alignment.git
foo@bar:~$ ./run.sh
```


#### Important Caveat: The alignment is performed by a static blastn executable in the ./alignments folder. The blastn executable in the repo is specific to MacOSX and can be replaced by windows or linux executables found here: 
[https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/](https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/)

#### Simply replace the executable with the correct binary. 

 