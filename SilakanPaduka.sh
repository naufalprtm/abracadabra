#!/bin/bash

openssl enc -d -aes-256-cbc -in SilakanPaduka.sh.enc -k "yourpassword" | bash
