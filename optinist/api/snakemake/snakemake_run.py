from snakemake import snakemake

from optinist.api.dir_path import DIRPATH


def run_snakemake(snakemake_params):
    # run snakemake
    snakemake(
        DIRPATH.SNAKEMAKE_FILEPATH,
        **snakemake_params
    )