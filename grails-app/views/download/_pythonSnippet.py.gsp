#!/usr/bin/env python

import csv
import urllib2
import StringIO

# The URL to the collection (as comma-separated values).
collection_url = "${collectionUrl}"

# Fetch data...
response = urllib2.urlopen(collection_url)

# Iterate on data...
for row in csv.reader(response):
    print row
